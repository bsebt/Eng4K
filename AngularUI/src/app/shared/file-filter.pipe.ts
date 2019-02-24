import { PipeTransform, Pipe } from '@angular/core';
import { FileUpload } from '../upload/fileupload';

@Pipe({
    // The name we use in our list-upload.component.html
    name: 'fileFilter'
})
export class FileFilterPipe implements PipeTransform{

    // The first parameter is the list of files,
    // and then the name of the file.
    transform(fileUploads: FileUpload[], searchTerm: string): FileUpload[] {
        if (!fileUploads || !searchTerm) {
            return fileUploads;
        }

        return fileUploads.filter(fileUpload =>
            fileUpload.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }

}