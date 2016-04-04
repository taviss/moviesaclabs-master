var pics = ['http://cdn3-www.dogtime.com/assets/uploads/2009/05/file_1096_should-i-pat-a-dogs-head.jpg',
            'http://www.dogchannel.com/images/dog-names-center/breed-photos/beagle-top.png',
            'http://files.symptomfind.com/files/gallery/hypoallergenic_dogs_and_cats1340764438.jpg',
            'http://kibblesmill.com/wp-content/uploads/2012/03/Kibbles-Mill-Small-Adult-Dog.png'
]

var index = 0;

function PreviewNext() {
    index > pics.length - 2 ? index = 0 : index++;
    var nindex = index + 1 > pics.length ? 0 : index++;
    document.getElementById("lpic").src = document.getElementById("pic").src;
    document.getElementById("pic").src = pics[index];
    document.getElementById("rpic").src = pics[nindex];
    //console.log(index);
}

function PreviewPrev() {
    index == 0 ? index = pics.length - 1 : index--;
    document.getElementById("pic").src = pics[index];
    //console.log(index);
}

function ButtonsStyle() {
    var bts = document.getElementsByClassName("buttons");
    for (var i = 0; i < bts.length; i++) {
        bts[i].style.borderRadius = "25px";
        bts[i].style.outline = "none";
    }
}

function AddImage() {

}