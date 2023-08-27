import { formatBucketName, formatFullPath, validateBucketName } from '@/utils/r2';
import { FilePreviewProvider } from '@/components';
import type { Metadata } from 'next';
import { Ctx } from './ctx';

export type RouteParams = { path: string[] };
type Props = { params: RouteParams; children: React.ReactNode };

export const generateMetadata = ({ params }: { params: RouteParams }): Metadata => ({
	title: formatBucketName(formatFullPath(params.path)[0]),
});

const Layout = ({ params: { path }, children }: Props): JSX.Element => {
	const [bucketName, ...fullPath] = formatFullPath(path);
	validateBucketName(bucketName);

	return (
		<>
			<Ctx bucketName={bucketName} path={fullPath} />
			<FilePreviewProvider bucketName={bucketName}>{children}</FilePreviewProvider>
		</>
	);
};

export default Layout;