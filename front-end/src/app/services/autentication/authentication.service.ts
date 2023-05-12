import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";


export class AutenticationService implements HttpInterceptor {
  constructor() {} 
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const token = sessionStorage.getItem("token");
    console.log("Token aqui bem " + token)
    if (token) {
      request = request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
  }

  return next.handle(request).pipe(
  	catchError((err) => {
   	 if (err instanceof HttpResponse) {
       	 if (err.status === 401) {
       	 // redirect user to the logout page
     	}
 	 }
  	return throwError(err);
	})
   )
  }
}