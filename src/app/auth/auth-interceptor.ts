import { AuthService } from './auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

// This is a service
// Angular will call interceptor for all requests leaving app and adds authRequst to it


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        //edit req headers: authorization header/ case insensitive >>
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + authToken)
        })
        return next.handle(authRequest);
    }
}