var time_out = 3000;
function log_start()
{
window.miman.style.visibility="visible";
window.setTimeout( "real_log_start()", time_out ); 
return false;
}
function real_log_start()
{
window.miman.style.display="none";
}
