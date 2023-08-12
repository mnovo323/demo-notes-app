import { StackContext, Bucket, Table } from 'sst/constructs';

export function StorageStack({ stack, app }: StackContext): {
  table: Table;
  bucket: Bucket;
} {
  const bucket = new Bucket(stack, 'Uploads');
  const table = new Table(stack, 'Notes', {
    fields: {
      userId: 'string',
      noteId: 'string',
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'noteId' },
  });

  return { table, bucket };
}
