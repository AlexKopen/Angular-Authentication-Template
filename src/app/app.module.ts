import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CallbackComponent, LoginComponent, DashboardComponent, HeaderComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
