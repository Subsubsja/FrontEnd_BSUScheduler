import FacultyForm from "./faculty-form";
import FacultyList from "./faculty-list";
import UpdateModal from "./faculty-modal";
import UploadFacultyForm from "./upload-faculty-form";

function FacultyPage() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 sm:flex-row sm:gap-4">
      <section className="flex h-full flex-col-reverse gap-4 sm:flex-col">
        <FacultyForm />
        <UploadFacultyForm />
      </section>

      <FacultyList />

      <UpdateModal />
    </div>
  );
}

export default FacultyPage;
