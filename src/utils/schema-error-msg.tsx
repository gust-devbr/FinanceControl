export function SchemaErrorMsg({ message }: { message: string | undefined }) {
    return (
        <p className="text-sm text-red-500">
            {message}
        </p>
    )
}