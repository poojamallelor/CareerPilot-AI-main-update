import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "../../components/ui/alert-dialog";
import QuestionLoader from "./Loader";
function LoadingDialog({ loading }) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogTitle>Working on it…</AlertDialogTitle>
          <AlertDialogDescription>
            Please wait while we generate the requested content.
          </AlertDialogDescription>
          <QuestionLoader />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LoadingDialog;
