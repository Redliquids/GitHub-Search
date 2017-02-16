/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

namespace GitSearch {
   
    declare var returned: any;
    export class GitHubSearch {


        // Unfinished Function that will search everytime a user enters a char in the searchbar
        // I avoided this to not reach the maximum request count on the github API
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
                if (e.keyCode === 13) {
                    GitSearch.GitHubSearch.Search();
                }
            });
        }

        static clearSearch() {
            var container = $("Result");
            document.getElementById("Result").innerHTML = "";
        }
        
        static Search() {
            GitHubSearch.clearSearch();
            var input = $("#SearchTxt").val();

            var url = "https://api.github.com/search/repositories?q=" + input;

            $.getJSON(url, function (data) {
                var returned = data.items;




                $.each(returned, function (index, item) {

                    var ownerProfileUrl = item.owner.avatar_url; // maybe i shouldn't use picture to save bandwith.
                    var repoName = item.name;
                    var repoOwner = item.owner.login;
                    var repoForks = item.forks;
                    var repoWatchers = item.watchers;
                    var repoUrl = item.html_url;

                    var displayResults = $("#Result");
                    var html = "";
                    html += "<div class='RepoBox clearfix'>";

                    var pressedRepo = item.url;

                    html += "<a href='http://localhost:2160/home/RepositoryView" + "?" + pressedRepo + "'</a>";// trying to re-route you to the repo you clicked.

                    html += "<img src='" + ownerProfileUrl + "' />";
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



