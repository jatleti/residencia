import { Component, inject, Input, OnInit } from '@angular/core';
import { Endpoints, PermissionsComponent, Student, StudentFacade, File } from '@workspace/shared/util-core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileBeforeUploadEvent } from 'primeng/fileupload';

@Component({
    selector: 'admin-student-files',
    standalone: false,
    templateUrl: './student-files.component.html',
    styleUrl: './student-files.component.scss',
})
export class StudentFilesComponent extends PermissionsComponent implements OnInit {
    @Input() student!: Student;
    studentFacade = inject(StudentFacade);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    API_UPLOAD_URL = Endpoints.API + '/storage/upload/file';

    newFile: File = <File>{};
    files: File[] = [];

    ngOnInit() {
        if (this.student && this.student.Files) {
            this.files = this.student.Files;
        }
    }

    onUploadFile(event: any) {
        this.newFile.url = event.originalEvent.body.file;
        this.newFile.name = event.originalEvent.body.name;
    }

    onBeforeUploadFile($event: FileBeforeUploadEvent) {
        $event.formData.append('path', 'files');
    }

    async addFile() {
        if (!this.newFile.url || this.newFile.url === '') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falta el fichero' });
            return;
        }
        this.files = await this.studentFacade.addFile(this.student.id, this.newFile);
        this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Fichero añadido' });
        this.newFile = <File>{};
    }

    async getFile(file: File) {
        if (!this.student || !this.student.id) return;

        const f = await this.studentFacade.getFile(this.student.id, file.id);
        if (f && f.url) {
            window.open(f.url, '_blank');
        }
    }

    async deleteFile(file: File) {
        this.confirmationService.confirm({
            message: '¿Seguro que quieres eliminar este fichero?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                this.files = await this.studentFacade.delFile(this.student.id, file.id);
                this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Fichero eliminado' });
            },
        });
    }
}
