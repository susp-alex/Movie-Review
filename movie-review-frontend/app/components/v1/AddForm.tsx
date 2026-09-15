import SubmitButton from './SubmitButton';

export default function AddForm({ submitAddAction }: { submitAddAction: (formData: FormData) => Promise<void> }) {
    return (
        <form action={submitAddAction}>
        <h3>Add a New Review</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Movie Name:</label>
          <input 
            type="text"
            name="movieName"
            style={{ width: '100%', padding: '8px' }} 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Review:</label>
          <textarea 
            name="review"
            style={{ width: '100%', padding: '8px' }} 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Rating (0-5):</label>
          <input type="number" name="rating" min="1" max="5" placeholder="Rating" />
        </div>

        <input type="hidden" name="userId" value="1" />

        <SubmitButton />
      </form>
    );
}