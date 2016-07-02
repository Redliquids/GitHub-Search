/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
var GitSearch;
(function (GitSearch) {
    var GitHubSearch = (function () {
        function GitHubSearch() {
        }
        //this should be called everytime  user enters a char in the searchbar
        GitHubSearch.SearchOnType = function () {
            var TextToSearch = $("#SearchTxt").text;
            if (TextToSearch.length > 3) {
                //wait 1 second then search for "TextToSearch.val"
                setTimeout(1500);
                if (TextToSearch.length != 3) {
                    GitHubSearch.SearchOnType();
                }
                else {
                }
            }
        };
        GitHubSearch.Init = function () {
            var search = document.getElementById("SearchTxt");
            search.addEventListener("keydown", function (e) {
                //console.log(e.keyCode);
                if (e.keyCode === 13) {
                    GitSearch.GitHubSearch.Search();
                }
            });
            var button = $("#SearchButton"); // actually useless.
            button.click(GitHubSearch.Search); // Couldn't get this to work...
        };
        GitHubSearch.clearSearch = function () {
            var container = $("Result");
            document.getElementById("Result").innerHTML = "";
            //container.empty(); jQuery failed me D:
        };
        GitHubSearch.Search = function () {
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
                    html += "<a href='http://localhost:2160/home/RepositoryView" + "?" + pressedRepo + "'</a>"; // trying to re-route you to the repo you clicked.
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
        };
        return GitHubSearch;
    }());
    GitSearch.GitHubSearch = GitHubSearch;
})(GitSearch || (GitSearch = {}));
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
//$(document).ready(function () {
//    console.log("Ready.");
function GetRepoData() {
    var parameters = location.search.substring(1).split("&");
    var url = parameters[0];
    $("#hider").hover($('#Information').hide);
    $.getJSON(url, function (data) {
        // Example of what i get https://api.github.com/repos/Redliquids/Assignment-7-Hide-Text
        var returned = data;
        var RepoName = data.full_name; // Title
        var RepoOwner = data.owner.login;
        var RepoForkCount = data.forks_count;
        var RepoWatchersCount = data.watchers_count;
        var RepoLanguage = data.language;
        var RepoSubscribers = data.subscribers_count;
        var RepoContributorsUrl = data.contributors_url; // This will be used to get the data on the contributors
        var Information = $("#Information"); // Selector
        //var title = document.getElementById("title");// Selector
        //title.innerHTML = RepoName;// Sets title
        var htmlInfo = "";
        //htmlInfo += "<div class='Information clearfix'>";
        htmlInfo += "<div>";
        htmlInfo += "   <div>";
        htmlInfo += "<h3>";
        htmlInfo += RepoName;
        htmlInfo += "</h3>";
        htmlInfo += "   </div>";
        htmlInfo += "<strong>Repo Name: </strong>";
        htmlInfo += RepoName;
        htmlInfo += "   <div>";
        htmlInfo += "<strong>Owner: </strong>";
        htmlInfo += RepoOwner;
        htmlInfo += "   </div>";
        htmlInfo += "   <div>";
        htmlInfo += "<strong>Forks: </strong>";
        htmlInfo += RepoForkCount;
        htmlInfo += "   </div>";
        htmlInfo += "   <div>";
        htmlInfo += "<strong>Watchers: </strong>";
        htmlInfo += RepoWatchersCount;
        htmlInfo += "   </div>";
        htmlInfo += "   <div>";
        htmlInfo += "<strong>Language: </strong>";
        htmlInfo += RepoLanguage;
        htmlInfo += "   </div>";
        htmlInfo += "</div>";
        htmlInfo += "<strong>Subscribers: </strong>";
        htmlInfo += RepoSubscribers;
        htmlInfo += "   </div>";
        htmlInfo += "</div>";
        Information.html(htmlInfo);
        $.getJSON(RepoContributorsUrl, function (object) {
            var contributorsData = data;
            //console.log("Array/List of Contributors: " + object); // Should log Every Contributor object
            $.each(object, function (index, Informaion) {
                var user = Informaion.login;
                var userPic = Informaion.avatar_url;
                var userLink = Informaion.url;
                var Contributors = $("#Contributors"); //Selector
                var htmlContributors = "";
                htmlContributors += "<div class='Contributors clearfix'>";
                htmlContributors += "<a href='" + userLink + "'</a>"; // Link to the user you clicked
                htmlContributors += "<img src='" + userPic + "'/>";
                htmlContributors += "<div>";
                htmlContributors += "   <div>";
                htmlContributors += "<strong>" + user + "</strong>";
                //htmlContributors += user;
                htmlContributors += "   </div>";
                htmlContributors += "</div>";
                Contributors.append(htmlContributors);
                // Code for onHover information starts here.
                var ContributorsRepoCount = Informaion.url.public_repos;
                var ContributorsLocation = Informaion.url.location;
                var ContributorsMail = Informaion.url.email;
                console.log("Contributor has: " + ContributorsRepoCount + " Repos.");
                // This should be displayed when hovering over contributor.
                var htmlContributorsInfo = ""; // not the same as just " htmlContributors "
                htmlContributorsInfo += "<div>";
                htmlContributorsInfo += "<p>Has " + ContributorsRepoCount + " Repos</p>";
                htmlContributorsInfo += "</div>";
                // im gonna need to append this code to the htmlContributors and hide it,
                // then only display it .onHover.
            });
        });
        // Inside first $.getJSON
        var RepoIssues = data.issues_url;
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        //// What we get: https://api.github.com/repos/Redliquids/Assignment-7-Hide-Text/issues{/number} ////
        //// What we get: https://api.github.com/repos/drewhannay/chess/issues{/number}                  ////
        //// We have to remove: {/number}                                                                ////
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log("NOT Trimmed url: " + RepoIssues);
        var split = RepoIssues.split("{");
        var RepoIssuesTrimmed = split[0];
        $.getJSON(RepoIssuesTrimmed, function (object) {
            // each issue. Display: object.title
            $.each(object, function (index, Issue) {
                var issueTitle = Issue.title;
                var issueLink = "placeholder";
                var htmlIssues = "";
                var Issues = $("#OpenIssues"); //Selector
                var htmlIssues = "";
                htmlIssues += "<div class='IssuesBox clearfix'>";
                htmlIssues += "<a href='" + issueLink + "'</a>"; // Link to the user you clicked
                htmlIssues += "<div>";
                htmlIssues += "   <div>";
                htmlIssues += "<strong>" + issueTitle + "</strong>";
                htmlIssues += "   </div>";
                htmlIssues += "</div>";
                Issues.append(htmlIssues);
            });
        });
        //Inside Function
    });
}
//# sourceMappingURL=main.js.map