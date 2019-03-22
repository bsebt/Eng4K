export class FileUpload {
 
    key: string;
    name: string;
    url: string;
    file: File;
    size: number;
    date: string;
    tags: string[];
 
    constructor(file: File) {
        this.file = file;
    }
}