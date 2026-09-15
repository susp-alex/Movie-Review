import DeleteSubmitButton from "./DeleteSubmitButton";

export default function DeleteForm({ reviewId, submitDeleteAction }: { reviewId: number; submitDeleteAction: (formData: FormData) => Promise<void>; }) {
    return (
        <form action={submitDeleteAction}>
            <input type="hidden" name="reviewId" value={reviewId}/>
            <DeleteSubmitButton />
        </form>
    );
}