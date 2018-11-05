interface IEvent {
    name: string;
}

interface IResult {
    id: string;
}

export const hello = (
    event: IEvent,
    context,
    cb: (err: Error | null, result: IResult) => void
) => {
    cb(null, { id: "test" });
};
