$(document).ready(function () 
{  
	  alert("good");
	$("#txtBookSearch").autocomplete(
	{ 

		source: function (request, response) 
		{
			
			var booksUrl = "https://www.googleapis.com/books/v1/volumes?printType=books&q=" + encodeURIComponent(request.term);
			$.ajax(
			{
				url: booksUrl,
				dataType: "json",
				success: function(data) 
				{
					response($.map(data.items, function (item) 
					{
				  if (item.volumeInfo.authors && item.volumeInfo.title && item.volumeInfo.industryIdentifiers && item.volumeInfo.publishedDate)
						{
							return 
							{
								
							  label: item.volumeInfo.title + ', ' + item.volumeInfo.authors[0] + ', ' + item.volumeInfo.publishedDate,
								value: item.volumeInfo.title,
								title: item.volumeInfo.title,
								author: item.volumeInfo.authors[0],
								isbn: item.volumeInfo.industryIdentifiers,
								publishedDate: item.volumeInfo.publishedDate,
								image: (item.volumeInfo.imageLinks == null ? "" : item.volumeInfo.imageLinks.thumbnai),
								description: item.volumeInfo.description,
							};
						}
					}));
				},
			});
		},
		select: function (event, ui) 
		{
			// what to do when an item is selected
			// first clear anything that may already be in the description
			$('#divDescription').empty();
			// we get the currently selected item using ui.item
			// show a pic if we have one
			if (ui.item.image != '')
			{
				$('#divDescription').append('<img src="' + ui.item.image + '" style="float: left; padding: 10px;">');
			}
			// and title, author, and year
			$('#divDescription').append('<p><b>Title:</b> ' + ui.item.title  + '</p>');
			$('#divDescription').append('<p><b>Author:</b> ' + ui.item.author  + '</p>');
			$('#divDescription').append('<p><b>First published year:</b> ' + ui.item.publishedDate  + '</p>');          
			// and the usual description of the book
			$('#divDescription').append('<p><b>Description:</b> ' + ui.item.description  + '</p>');
			// and show the link to oclc (if we have an isbn number)
			if (ui.item.isbn && ui.item.isbn[0].identifier)
			{
				$('#divDescription').append('<P><b>ISBN:</b> ' + ui.item.isbn[0].identifier + '</p>');
				$('#divDescription').append('<a href="http://www.worldcat.org/isbn/' + ui.item.isbn[0].identifier + '" target="_blank">View item on worldcat</a>');
			}
		},
		minLength: 2 ;

	}); 
});
