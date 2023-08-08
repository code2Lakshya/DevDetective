const searchButton=document.querySelector('.btn');
const errorr=document.querySelector('[data-error]');
const userInfoContainer=document.querySelector('.userInfo-container');
const userImage=document.querySelector('.userInfo-container>img');
const joiningDate=document.querySelector('[data-joiningDate]');
const userName=document.querySelector('[data-name]');
const username=document.querySelector('[data-userName]');
const bio=document.querySelector('[data-bio]');
const repos=document.querySelector('[data-repos]');
const followers=document.querySelector('[data-followers]');
const following=document.querySelector('[data-following]');
const locationLink=document.querySelector('[data-locationLink]');
const blogslink=document.querySelector('[data-blogslink]');
const twitterLink=document.querySelector('[data-twitterLink]');
const companyLink=document.querySelector('[data-companyLink]');
const modeText=document.querySelector('[data-color]');
const moon=document.querySelector('#moon');
const sun=document.querySelector('#sun');
const changeMode=document.querySelector('.changeColor-container');
let mode='Dark';
moon.classList.add('active');
modeText.innerHTML=mode;
const month=['January','February','March','April','May','June','July','August','September','October','November','December'];
console.log(userImage);
function renderDetails(details){
       userImage.src=`${details?.avatar_url}`;
       const d=new Date(details?.created_at);
       joiningDate.innerText=`Joined at ${d.getDate()} ${month[d.getMonth()-1]} ${d.getFullYear()}`;
       userName.innerText=details?.name;
       username.innerText=`@${details?.login}`;
       username.href=details?.html_url;
       bio.innerText=details?.bio;
       following.innerText=details?.following;
       followers.innerText=details?.followers;
       repos.innerText=details?.public_repos;
       locationLink.innerText=details?.location??'Not Available';
       blogslink.innerText=details.blog==""?'Not Available':details.blog;
       blogslink.href=details.blog==""?'#':details.blog;
       companyLink.innerText=details?.company??'Not Available';
       twitterLink.innerText=details?.twitter_username??'Not Available';
       twitterLink.href=details?.twitter_username?`https://twitter.com/${details.twitter_username}`:'#';
}
async function fetchDetails(userSearch){
    try{
    const response=await fetch(`https://api.github.com/users/${userSearch}`);
    const data=await response.json();
    if(data.name){
         renderDetails(data);
    }
    else{
        errorr.classList.add('active');
    }
    } 
    catch(error){
        console.log(error);
    }
}
searchButton.addEventListener('click',()=>{
    errorr.classList.remove('active');
    const userSearch=document.querySelector('[data-input]').value;
    if(userSearch!='')
    fetchDetails(userSearch);
})
function init(){
 errorr.classList.remove('active');
 fetchDetails('code2lakshya');
}
init();
changeMode.addEventListener('click',()=>{
    if(mode==='Dark'){
        mode='Light';
        modeText.innerText=mode;
        moon.classList.remove('active');
        sun.classList.add('active');
        document.documentElement.style.setProperty('--placeholder-bg','white');
        document.documentElement.style.setProperty('--lm-bg','#141D2F');
        document.documentElement.style.setProperty('--lm-bg-content','#141D2F');
        document.documentElement.style.setProperty('--lm-search-bg','#1E2A47');
        document.documentElement.style.setProperty('--lm-text','#f6f8ff');
        document.documentElement.style.setProperty('--lm-text-alt','#f6f8ff');
        document.documentElement.style.setProperty('--lm-text-alt','#f6f8ff');
        userName.style.color='#f6f8ff';
        joiningDate.style.color='#f6f8ff'
    }
    else{
        mode='Dark';
        modeText.innerText=mode;
        moon.classList.add('active');
        sun.classList.remove('active');
        document.documentElement.style.setProperty('--placeholder-bg','#141D2F');
        document.documentElement.style.setProperty('--lm-bg','#f6f8ff');
        document.documentElement.style.setProperty('--lm-bg-content','#f6f8ff');
        document.documentElement.style.setProperty('--lm-search-bg','#fefefe');
        document.documentElement.style.setProperty('--lm-text','#141D2F');
        document.documentElement.style.setProperty('--lm-text-alt','#141D2F');
        document.documentElement.style.setProperty('--lm-text-alt','#141D2F');
        userName.style.color='#141D2F';
        joiningDate.style.color='#141D2F'
    }
})

