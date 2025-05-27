import { Injectable } from "@angular/core";
import { ApiService } from "@workspace/shared-ui";


@Injectable({
  providedIn: "root",
})
export class ConciliatorFormService {
  constructor(private api: ApiService) {}

  addConciliator(postData: any) {
    return this.api.post("conc/add-new-conciliator", postData);
  }

  addFiles(form: FormData) {
    return this.api.post("file-repo/storefile", form);
  }

  getConciliatorById(id: string) {
    return this.api.get(`conc/fetch-conciliator/${id}`);
  }

  updateConciliator(id: string, data: any) {
    return this.api.put(`conc/update-conciliator/${id}`, data);
  }
}
