import { Skeleton, Stack } from "@mui/material";

export const AccountControlsSkeleton = () => (
    <Stack direction="column" spacing={0.5}>
        <Skeleton variant="text" width="99%" height={20} />
        <Skeleton variant="text" width="85%" height={16} />
    </Stack>
);
