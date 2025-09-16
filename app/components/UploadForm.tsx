import FileUploader from "./FileUploader";

interface UploadFormProps {
  onFileSelect: (file: File | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadForm = ({ onFileSelect, onSubmit }: UploadFormProps) => {
  return (
    <form
      id="upload-form"
      onSubmit={onSubmit}
      className="mt-8 flex flex-col gap-4"
    >
      <div className="form-div">
        <label htmlFor="company-name">Company Name</label>
        <input
          type="text"
          id="company-name"
          name="company-name"
          placeholder="Company name"
        />
      </div>
      <div className="form-div">
        <label htmlFor="job-title">Job Title</label>
        <input
          type="text"
          id="job-title"
          name="job-title"
          placeholder="Job Title"
        />
      </div>
      <div className="form-div">
        <label htmlFor="job-description">Job Description</label>
        <textarea
          rows={5}
          id="job-description"
          name="job-description"
          placeholder="Job Description"
        />
      </div>
      <div className="form-div">
        <label htmlFor="uploader">Upload Resume</label>
        <FileUploader onFileSelect={onFileSelect} />
      </div>

      <button type="submit" className="primary-button">
        Analyze Resume
      </button>
    </form>
  );
};

export default UploadForm;
