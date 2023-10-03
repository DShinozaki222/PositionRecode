export class DateHelper {

    /** */
    public getNowDate(): string {
        const now = new Date();
        return now.getFullYear().toString() + '/' +
               (now.getMonth() + 1).toString().padStart(2, '0') + '/' + 
               now.getDate().toString().padStart(2, '0');
    }

    /**
     *  getNowDateTime
     */
    public getNowDateTime() {
        const now = new Date();
        return now.getFullYear().toString() + '/' +
                    (now.getMonth() + 1).toString().padStart(2, '0') + '/' +
                    now.getDate().toString().padStart(2, '0') + ' ' +
                    now.getHours().toString().padStart(2, '0') + ':' +
                    now.getMinutes().toString().padStart(2, '0') + ':' +
                    now.getSeconds().toString().padStart(2, '0');
    }

}
