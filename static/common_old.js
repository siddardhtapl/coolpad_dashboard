if(!localStorage.getItem("session"))
{
alert("Please Login to continue");
window.location.href="../login";
}

function logout(){
localStorage.removeItem("session");
window.location.href="../login";
}

function share(){
                var msgbody = "http://takvaviya.in:8001/coolpad_ui/project/login/";
                var url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Coolpad Dashboard&body=link here: '+msgbody+'&ui=2&tf=1&pli=1';
                window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
            }