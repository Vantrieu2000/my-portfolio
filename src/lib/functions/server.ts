export function convertPagination(page: number, pageSize: number) {
    return { limit: pageSize, skip: (page - 1) * pageSize };
}

export async function processStream(stream: ReadableStream<any>) {
    const decoder = new TextDecoder();
    const reader = stream.getReader();

    let result: any[] = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        // Code to process the current chunk of data
        result.push(decoder.decode(value));
    }

    return result.join('');
}
