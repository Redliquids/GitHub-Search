/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

namespace GitSearch {
   
    declare var returned: any;
    export class GitHubSearch {


        //this should be called everytime  user enters a char in the searchbar
        static SearchOnType() {
            var TextToSearch = $("#SearchTxt").text;

            if (TextToSearch.length > 3) {
                //wait 1 second then search for "TextToSearch.val"
                setTimeout(1500);
                if (TextToSearch.length != 3) {
                    GitHubSearch.SearchOnType();
                }
                else {
                    //do the actuall search, give dropdown?
                }

            }

        }

        static Init(){
            var search = document.getElementById("SearchTxt");
            search.addEventListener("keydown", function (e) {
                //console.log(e.keyCode);
                if (e.keyCode === 13) {
                    GitSearch.GitHubSearch.Search();
                }
            });

            var button = $("#SearchButton"); // actually useless.
            button.click(GitHubSearch.Search); // Couldn't get this to work...
        }

        static clearSearch() {
            var container = $("Result");
            document.getElementById("Result").innerHTML = "";
            //container.empty(); jQuery failed me D:
        }
        
        static Search() {
            GitHubSearch.clearSearch();
            var input = $("#SearchTxt").val();


            //console.log(input);
            var url = "https://api.github.com/search/repositories?q=" + input;

            $.getJSON(url, function (data) {
                var returned = data.items;
                //console.log(returned);




                $.each(returned, function (index, item) {

                    var ownerProfileUrl = item.owner.avatar_url; // maybe i shouldn't use picture to save bandwith.
                    var repoName = item.name;
                    var repoOwner = item.owner.login;
                    var repoForks = item.forks;
                    var repoWatchers = item.watchers;
                    var repoUrl = item.html_url; // don't forget this

                    var displayResults = $("#Result");
                    var html = "";
                    html += "<div class='RepoBox clearfix'>";

                    var pressedRepo = item.url; // i need to send this to the other page

                    html += "<a href='http://localhost:2160/home/RepositoryView" + "?" + pressedRepo + "'</a>";// trying to re-route you to the repo you clicked.
                    // i can't beleive all i had to do was add "?" and the link...

                    html += "<img src='" + ownerProfileUrl + "' />"; // maybe i shouldn't use picture to save bandwith.
                    html += "<div>";
                    html += "   <div>";
                    html += "<strong>Repo: </strong>";
                    html += repoName;
                    html += "   </div>";
                    html += "   <div>";
                    html += "<strong>Owner: </strong>";
                    html += repoOwner;
                    html += "   </div>";
                    html += "   <div>";
                    html += "<strong>Watchers: </strong>";
                    html += repoWatchers;
                    html += "   </div>";
                    html += "   <div>";
                    html += "<strong>Forks: </strong>";
                    html += repoForks;
                    html += "   </div>";
                    html += "</div>";

                    displayResults.append(html);
                });
            });

        }
    }
}



