import { FormGroup } from "@angular/forms";
import { MatDialogConfig } from "@angular/material/dialog";

export const formModalData = (formGroup: FormGroup): MatDialogConfig => ({
  data: formGroup,
  width: "1000px",
  height: "650px",
  maxWidth: "96vw",
  maxHeight: "90vh",
});
