
//html eke thiye form ekm select krgnnwa
var form=document.getElementById('add-frm');

//input title ekyi text area ekyi variable ekkt select krgnnwa
var ntitle=document.getElementById('n-title');
var nbody=document.getElementById('n-body');
var tablediv = document.getElementById('tbl-div');
var items=document.getElementById('items'); //get the table of html
var noteCount =0;
var newNote='';
var search=document.getElementById('srch');
var isUpdate=false;
var record='';
var note='';
var body='';
var resetbtn=document.getElementById('reset');


//---Event----
// for page loads

window.onload =updateTable;//page ek load wenkotm table ek omi widiyt display wenwa 
//form submit
form.addEventListener('submit',addNote);
//fot search
search.addEventListener('keyup',searchNote);

// For remove
items.addEventListener('click',removeNote);

//for view and upadte
items.addEventListener('click',viewUpdateNote);

//for reset
resetbtn.addEventListener('click',resetAll);
function updateTable(){
//Display the table when notes get added
//note thibbot display wenwa note nethi unot table ek hide wenwa
if(noteCount > 0 ){
    tablediv.style.display ='';
    //update note
    if(isUpdate){
        note.firstChild.textContent = ntitle.value;
        note.lastChild.textContent=nbody.value;
        //reset update and note count
        isUpdate=false;
        noteCount--;

    }else{
        items.appendChild(newNote);
    }
}
else{
    tablediv.style.display='none';
}
}

//Add Note Function

function addNote(e){
    //stop initial behavior
    e.preventDefault();

    //validate input
    if(ntitle.value == '' || nbody.value==''){

        alert("Please fill all fields");
    }
    else{
        // Create a new note record

        // New tr
        var tr = document.createElement('tr');
        tr.className = 'item';

        // New td for title and body
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(ntitle.value));
        var span = document.createElement('span');
        span.className = 'note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);
// new td for view
        var td2 = document.createElement('td');
        td2.className= 'btnv';
        var btn1=document.createElement('button');
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id','vw');
        td2.appendChild(btn1);

//net td for delete
        var td3 = document.createElement('td');
        td3.className= 'btnd';
        var btn2=document.createElement('button');
        btn2.appendChild(document.createTextNode('Delete'));
        btn2.setAttribute('id','del');
        td3.appendChild(btn2);


        //add all tds to tr

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

//increement note Count

noteCount ++;
//set new note
newNote=tr;

//Add or update the node of the table
updateTable();


    }
//Reset All
resetAll();
}

//search Notes
function searchNote(e){

    //Text to alower case

    var searchText = e.target.value.toLowerCase();
   //get list
   var list=items.getElementsByClassName('item');
   //convert to an arry 
var listar = Array.from(list);
listar.forEach(function(item){
    //Get title
    var noteTitle=item.firstChild.textContent;
    //Match 
    if(noteTitle.toLocaleLowerCase().indexOf(searchText)!= -1){
        item.style.display ='';

    }
    else{
        item.style.display ='none';

    }
});

}

//Remove Note
function removeNote(e){

    if(e.target.id==='del'){
        if(confirm("Are you sure?")){
            //delete notes
            var tr=e.target.parentElement.parentElement;
            items.removeChild(tr);
//update table
            noteCount--;
            if(noteCount==0){
                updateTable();
            }
        }
    }
}
//view and update Note
function viewUpdateNote(e){
    if(e.target.id==='vw'){
//Get the elment values &update input fields
    record=e.target.parentElement.parentElement;
    note=record.firstChild;
    ntitle.value=note.firstChild.textContent;
    nbody.value=note.lastChild.textContent;
isUpdate=true;

}


}
//Reset All

function resetAll(){

    ntitle.value='';
    nbody.value='';
    isUpdate=false;
    newNote='';

    view='';
}