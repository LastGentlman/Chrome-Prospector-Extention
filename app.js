let myLeads = [];
const inputEl = document.querySelector('#input-el');
const logEl = document.querySelector('#log-el');
const li = document.createElement('li');
const delButton = document.querySelector('#del-btn')
                            .addEventListener('dblclick', () => {
                                localStorage.clear();
                                myLeads = [];
                                console.log('Storage Deleted')
                                render(myLeads);
});
const inputBtn = document.querySelector('#input-btn')
                            .addEventListener('click', () => {
                                if(inputEl.value === "") {
                                    console.log('Input Value is Empty');
                                } else {
                                    myLeads.push(inputEl.value);
                                    inputEl.value = "";
                                    document.querySelector('#input-el').focus();
                                    localStorage.setItem('myLeads', JSON.stringify(myLeads));
                                    render(myLeads);
                                }
});

const saveTabBtn = document.querySelector('#save-tab')
                            .addEventListener('click', () => {
                                //if (currentTab is already saved) console.log('Tab already Saved')
                                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { //chrome extention API
                                    myLeads.push(tabs[0].url);
                                    document.querySelector('#input-el').focus();
                                    localStorage.setItem('myLeads', JSON.stringify(myLeads));
                                    render(myLeads);
                                })
});

let retriveItem = JSON.parse( localStorage.getItem("myLeads") );

if (retriveItem) {
    myLeads = retriveItem;
    render(myLeads);
}

function render(key) {
    document.querySelector('ul').appendChild(li);
    let items = "";
    for(let i = 0; i < key.length; i++) {
        items += `
        <li>
            <a href='${key[i]}' target='_blank'>${key[i]}</a>
        </li>`;
    }
    logEl.innerHTML = items;
}