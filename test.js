function showDiv() {
  var x = document.getElementById('dataListDiv');
  if (x == null) {
    var newDiv=document.createElement('div');
    newDiv.id='dataListDiv';
    newDiv.innerHTML='<div style="position: absolute;left: 30%;top: 10%;background-color: #0f0;"><textarea rows=10 cols=50 id=dataList></textarea><br /><input type="button" value="Go" onclick="process()"></input></div>'
    document.getElementById('widgetFrameFlash_add_edit_group').appendChild(newDiv); 
  }
}

function process() {
  var dlDivElement = document.getElementById('dataListDiv');
  var dlElement = document.getElementById('dataList');
  var dataListText = dlElement.value;
  dlDivElement.parentNode.removeChild(dlDivElement);
  var listItems = dataListText.split('\n')
  listItems.forEach(function (listItem) {
    tryListItem(listItem);
  });

}

function tryListItem(listItem) {
  listItemData=listItem.split(/[\t,]/)
  var surname=listItemData[0]
  var forename=listItemData[1]
  var cl=listItemData[2]
  foundRow = document.evaluate('//table[@id="student_dataTable"]//tr[./td/text()="'+surname+'" and ./td/text()="'+forename+'" and ./td/text()="'+cl+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if(foundRow.singleNodeValue != null) {
    foundCheckBox=document.evaluate('.//input[@type="checkbox"]', foundRow.singleNodeValue, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if(foundCheckBox.singleNodeValue && !foundCheckBox.singleNodeValue.checked) foundCheckBox.singleNodeValue.click(); 
    //alert('found - ' + listItem)
  } else {
    console.log('not found - ' + listItem)
  }
}

showDiv();
