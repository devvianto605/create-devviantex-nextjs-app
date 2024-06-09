export const getAppDestIndexPath = ({ usingNextAuth, usingIntl }: { usingNextAuth: boolean, usingIntl: boolean }) => {
    if (usingNextAuth) {
        return usingIntl ? "src/app/[locale]/(public)/(home)" : "src/app/(public)/(home)";
    }

    return usingIntl ? "src/app/[locale]/(home)" : "src/app/(home)";
};