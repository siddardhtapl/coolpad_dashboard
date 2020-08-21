from django.shortcuts import render

# Create your views here.
def login(request):
    return render(request,template_name="login.html")
'''
def signup(request):
    return render(request,template_name="sign_up.html")'''

def dashboard(request):
    return render(request,template_name="dashboard.html")

def history_dashboard(request):
    return render(request,template_name="history_dash.html")

def contact(request):
    return render(request,template_name="index2.html")

def adduser(request):
    return render(request,template_name="user_form.html")

def stickynotes(request):
    return render(request,template_name="sticky.html")