/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CryptoJS from 'crypto-js';

class Encryption {
  private static getEncryptionKey(): string {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
      throw new Error('Encryption key not found in environment variables');
    }
    return key;
  }

  private static getEncryptionOptions() {
    const key = this.getEncryptionKey();
    const aesKey = CryptoJS.enc.Utf8.parse(key);
    const cipherOption = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    };

    return {
      aesKey,
      cipherOption,
    };
  }

  public static async encryptObject(data: Record<string, unknown>) {
    try {
      const { aesKey, cipherOption } = await this.getEncryptionOptions();
      const encryptedData: Record<string, string> = {};

      Object.entries(data).forEach(([key, value]) => {
        const isValid = value !== null && value !== undefined;
        const isStringOrNum =
          typeof value === 'string' || typeof value === 'number';
        const _val = isValid && isStringOrNum ? value.toString() : 'N/A';
        const encrypted = CryptoJS.AES.encrypt(_val, aesKey, cipherOption);
        encryptedData[key] = encrypted.toString();
      });

      return encryptedData;
    } catch (error) {
      throw new Error(`Encrypt data failed: ${(error as Error).message}`);
    }
  }

  public static  decryptObject(encryptedData: Record<string, string>) {
    try {
      const { aesKey, cipherOption } =  this.getEncryptionOptions();
      const decryptedData: Record<string, string> = {};

      Object.entries(encryptedData).forEach(([key, value]) => {
        const decrypted = CryptoJS.AES.decrypt(value, aesKey, cipherOption);
        decryptedData[key] = decrypted.toString(CryptoJS.enc.Utf8);
      });

      return decryptedData;
    } catch (error) {
      throw new Error(`Decrypt data failed: ${(error as Error).message}`);
    }
  }

  public static  decryptString(encryptedMessage: string): Promise<string> {
    try {
      const { aesKey, cipherOption } =  this.getEncryptionOptions();
      const decrypted = CryptoJS.AES.decrypt(
        encryptedMessage,
        aesKey,
        cipherOption,
      );

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      throw new Error(`Decryption failed: ${(error as Error).message}`);
    }
  }

  public static encryptString(message: string): Promise<string> {
    try {
      const { aesKey, cipherOption } = this.getEncryptionOptions();
      const encrypted = CryptoJS.AES.encrypt(message, aesKey, cipherOption);

      return encrypted.toString();
    } catch (error) {
      throw new Error(`Encryption failed: ${(error as Error).message}`);
    }
  }
}

export default Encryption;
