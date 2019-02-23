export class FileUpload {
 
    key: string;
    name: string;
    url: string;
    file: File;
    size: number;
 
    constructor(file: File) {
        this.file = file;
    }
}