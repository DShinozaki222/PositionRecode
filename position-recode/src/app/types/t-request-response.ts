import { HttpResponse } from "@angular/common/http"

export type TRequestResponse<T> = {
    body?: T,
    status: number,
    isResult: boolean
}