$(document).ready(function(e) {

    // Login
    $("#login_btn").on('click', function(e){
        e.preventDefault();

        var username = $("#usernameLog").val();
        var password = $("#passwordLog").val();

        user_data = {
            'username':username,
            'password':password
        };
        
        $.post("Login", user_data, function(data){

        	if(data.status == 'fail'){
        		// alert(data.message);
                displayError(data.message, $("#login_btn"));
                $("#passwordLog").val("");

        	}else if(data.status == 'success'){
        		$("#logged_out").hide();
        		$("#logged_in").show();
                $("#tlogged_in").show();
                $("#clogged_in").show();
        		
        		$("#LoggedInUsername").text(username);

                $(".black_window_container").hide();
                $(".login_window").hide();
        		
                $(".colButton").css('display', 'block');
        		$(".colButton").show();
        		$("#userId").val(data.userId);


                $(".nav-closed").css('display', 'inline');
                $(".nav-opened").css('display', 'inline');
                $(".nav-subForum").css('display', 'inline');
                $(".nav-topic").css('display', 'inline');

                // if(data.userId == 1){
                //     $(".add_forum").css('display', 'inline');
                //     location.reload();
                    
                // }else if(data.userId == 2){
                //     location.reload();
                // }else{
                //     location.reload();
                // }

                $(".add_topic").css('display', 'inline');

                location.reload();

        	}
        	
        	
        });

    });


    // Making new reply
    $("#btn_post").on('click', function(e){

        var content = $("#text_box").val();

        user_data = {
            'action': 'add',
            'content': content,
            'topicId': $("#topicId").val()
        }

        if(content == ""){
            displayError("Komentar ne sme biti prazan!", $(this));
            return;
        }else if(content.length < 10){
            displayError("Komentar mora biti duzi (min 10 karaktera)!", $(this));
            return;
        }

        reply(user_data);

    });

    // Show register window
    $("#btn_register").on('click', function(e){
    	
        $(".black_window_container").show();
        $(".register_window").show();

    });


    // Show login window
    $("#btn_login").on('click', function(e){
        
        $(".black_window_container").show();
        $(".login_window").show();

    });



    // Logging out
    $("#btn_logout").on('click', function(e){
        if (confirm("Da li ste sigurni da zelite da se izlogujete?")) 
        {
            window.location.href = "Logout";

        }

    });
    
    // Redirect to Panel
    $("#btn_panel").on('click', function(e){
    	window.location.href = "Panel";
    	
    });
    
    
    // Registration
    $("#register_btn").on('click', function(e){
    	e.preventDefault();

        var username = $("#usernameReg").val();
        var email = $("#email").val();
        var password = $("#pwd").val();
        var password2 = $("#pwd2").val();
        var fname = $("#fname").val();
        var lname = $("#lname").val();

        // maybe do some checks an shit here
        if(username == "" || email == "" || password == "" || password2 == ""){
            displayError("Morate popuniti sva polja!", $(this));
            return;
        }else if(password != password2){
            displayError("Lozinka se ne slaze sa nasom u bazi!", $(this));
            return;
        }else if(password.length < 10){
            displayError("Lozinka mora biti minimalno 10 karaktera!", $(this));
            return;
        }


        user_data = {
            'username':username,
            'email': email,
            'password':password,
            'password2':password2,
            'fname': fname,
            'lname': lname
        };


        $(".register_window").hide();

        // setTimeout(function(){
        //     register(user_data);
            
        // }, 3000);

        register(user_data);


    });



    // Closing black container window
    $(".btn_black_win_container_close").on('click', function(e){
        e.preventDefault();
        $(".register_window").hide();
        $(".login_window").hide();
        $(".addForum_container").hide();
        $(".addTopic_container").hide();
        $(".editForum_container").hide();
        $(".black_window_container").hide();
        $(".reply_windowEdit").hide();
        $(".advancedSearch_container").hide();

    });

    $(".black_window_container").on('click', function(e){

        if (e.target === this){
            $(".black_window_container").hide();
            $(".register_window").hide();
            $(".login_window").hide();
            $(".addForum_container").hide();
            $(".addTopic_container").hide();
            $(".reply_window").hide();
            $(".editForum_container").hide();
            $(".reply_windowEdit").hide();
            $(".advancedSearch_container").hide();

        }

    });




    // Change details
    $("#change_details").on('click', function(e){
        e.preventDefault();

        user_data = {
            'action': 'editInfo',
            'email': $("#email").val(),
            'fname': $("#fname").val(),
            'lname': $("#lname").val(),
            'pageNum': $("#numberPerPage").val()
        }


        $.post("Panel", user_data, function(data){

            if(data.status == 'fail'){
                // alert(data.message);
                displayError(data.message, $(this));

            }else if(data.status == 'success'){
                // alert(data.message);
                displaySuccess(data.message);
                // location.reload();

            }

        });



    });


     // Change password
    $("#change_pass").on('click', function(e){
        e.preventDefault();

        var oldPass = $("#oldPassword").val();
        var pass1 = $("#password1").val();
        var pass2 = $("#password2").val();

        if(oldPass == "" || pass1 == "" || pass2 == ""){
            displayError("Polja moraju biti popunjena!", $(this));
            return;
        }else if(pass1 != pass2){
            displayError("Lozinka se ne slaze sa nasom u bazi!", $(this));
            return;
        }else if(pass1.length < 10){
            displayError("Lozinka mora biti minimalno 10 karaktera!", $(this));
            return;
        }

        user_data = {
            'action': 'editPass',
            'oldPassword': oldPass,
            'password1': pass1,
            'password2': pass2
        }


        $.post("Panel", user_data, function(data){

            if(data.status == 'fail'){
                // alert(data.message);
                displayError(data.message, $(this));
            }else if(data.status == 'success'){
                // alert(data.message);
                window.location.href = "Logout";
                displaySuccess(data.message);

            }

        });



    });


    // // Change avatar
    $("#save_avatar").on('click', function(e){
        e.preventDefault();

        files = ($("#change_avatar"))[0].files;
        if(files.length <= 0){
            displayError("Odaberite fajl prvo!", $(this));
            return;
        }


        var avatarFile = files[0];

        var user_data = new FormData();
        user_data.append('action', 'editAvatar');
        user_data.append('avatar', avatarFile);


        $.ajax({
            url: './Panel',
            type: 'POST',
            data: user_data,
            processData: false,
            contentType: false,
            success: function(data, status, nesto){
                displaySuccess(data.message);
            }
        })
        


    });



    // Showing 'add new topic' window
    $(".add_topic").on('click', function(e){
        $(".black_window_container").show();
        $(".addTopic_container").show();



    });


    // Showing 'add new forum' window
    $(".add_forum").on('click', function(e){
        $(".black_window_container").show();
        $(".addForum_container").show();

        var tip;
        var tip_tmp = e.target.id;

        if(tip_tmp == "public"){
            tip = 1;
        }else if(tip_tmp == "opened"){
            tip = 2;
        }else {
            tip = 3;
        }

        $("#typeId").val(tip);


    });


    // Showing 'New Topic' window
    $("#add_reply_normal").on('click', function(e){

        $(".black_window_container").show();
        $(".reply_window").show();


    });


    // Adding New Forum
    $("#addForum_btn_add").on('click', function(e){
        e.preventDefault();

        var name = $("#name").val();
        var desc = $("#description").val();
        var userId = $("#userId").val();
        var typeId = $("#typeId").val();
        var parentId = $("#parentId").val();

        user_data = {
            'action': 'add',
            'name': name,
            'description': desc,
            'userId': userId,
            'typeId': typeId,
            'parentId': parentId
        };


        if(name == ""){
            displayError("Ime foruma ne sme biti prazno!", $(this));
            return;
        }

        addForum(user_data);

    });


    // Editing Forum
    $("#editForum_btn_edit").on('click', function(e){
        e.preventDefault();

        var forumId = $("#forumId").val();
        var name = $("#editName").val();
        var desc = $("#editDescription").val();
       

        if(name == ""){
            displayError("Ime foruma ne sme biti prazno!", $(this));
            return;
        }

        user_data = {
            'action': 'edit',
            'id': forumId,
            'name': name,
            'description': desc
        };


        $.post('Forum', user_data, function(data) {

            if(data.status == "success"){
                displaySuccess(data.message);

                $(".black_window_container").hide();
                $(".editForum_container").hide();

                location.reload();

            }else{
                displayError(data.message, $(this));
            }

        });

    });



    // Editing Member
    $("#editMember_btn_edit").on('click', function(e){
        e.preventDefault();

        id = $("#memberId").val();
        roleId = $("#memberRole").val();
        email = $("#editEmail").val();
        username = $("#editUsername").val();
        fname = $("#editfName").val();
        lname = $("#editlName").val();

        user_data = {
            'action': 'editMember',
            'id': id,
            'roleId': roleId,
            'email': email,
            'username': username,
            'fname': fname,
            'lname': lname

        };


        $.post('Panel', user_data, function(data) {

            if(data.status == "success"){

                $(".black_window_container").hide();
                $(".editMember_container").hide();

                displaySuccess(data.message);
                window.setTimeout(function(e){
                    location.reload();
                }, 3000);

            }else{
                displayError(data.message, $(this));
            }

        });

    });


    // Adding New Topic
    $("#addTopic_btn_add").on('click', function(e){
        e.preventDefault();
        
        var name = $("#topicTitle").val();
        var desc = $("#topicDesc").val();
        var content = tinymce.get('topicText').getContent();
        var userId = $("#userId").val();
        var forumId = $("#forumId").val();

        if(name == "" || content == ""){
            displayError("Naslov i sadrzaj moraju biti popunjeni!", $(this));
            return;
        }else if(content.length < 15){
            displayError("Sadrzaj mora da ima bar 15 karaktera!", $(this));
            return;
        }

        user_data = {
            'action': 'add',
            'name': name,
            'description': desc,
            'content': content,
            'userId': userId,
            'forumId': forumId
        };

        addTopic(user_data);

    });


    // Editing New Topic
    $("#editTopic_btn_edit").on('click', function(e){
        e.preventDefault();
        
        var id = $("#topicId").val();
        var title = $("#topicTitle").val();
        var desc = $("#topicDesc").val();
        var content = tinymce.get('topicText').getContent();

        if(title == "" || content == ""){
            displayError("Naslov i sadrzaj moraju biti popunjeni!", $(this));
            return;
        }

        user_data = {
            'action': 'edit',
            'id': id,
            'title': title,
            'description': desc,
            'content': content
        };

        // edit topic here...
        $.post("Topic", user_data, function(data){

            if(data.status == 'success'){
                displaySuccess(data.message);
                location.reload();

            }else{
                displayError(data.message, $(this));
               
            }

        });

    });


    // Adding New Reply
    $("#addReply_btn").on('click', function(e){
        e.preventDefault();

        var content = tinymce.get('topicCont').getContent();

        user_data = {
            'action': 'add',
            'content': content,
            'topicId': $("#topicId").val()
        }

        if(content == ""){
            displayError("Sadrzaj ne sme biti prazan!", $(this));
            return;
        }else if(content.length < 15){
            displayError("Sadrzaj treba da sadrzi bar 15 karaktera", $(this));
            return;
        }

        reply(user_data);

    });


    // Register function
    function register(user_data){

        $.post("Register", user_data, function(data){

            if(data.status == 'fail'){
                $(".register_window").show();
                displayError(data.message, $("#register_btn"));

            }else if(data.status == 'success'){
                $(".register_window").hide();
                displaySuccess(data.message);
               /* window.setTimeout(function(e){
                    location.reload();
                }, 3000);*/

                $(".black_window_container").hide();
            }

        });

    };


    // Adding forum function
    function addForum(user_data){

        $.post("Forum", user_data, function(data){

            if(data.status == 'fail'){
                displayError(data.message, $("#addForum_btn_add"));
            }else if(data.status == 'success'){
                displaySuccess(data.message);
                
                $(".black_window_container").hide();
                $(".addForum_container").hide();
                location.reload();



            }

            $("#name").val("");
            $("#description").val("");

        });

    };


    // Adding topic function
    function addTopic(user_data){

        $.post("Topic", user_data, function(data){

            if(data.status == 'fail'){
                displayError(data.message, $("#addTopic_btn_add"));

            }else if(data.status == 'success'){
                displaySuccess(data.message);

                $(".black_window_container").hide();
                $(".addTopic_container").hide();
                location.reload();

            }

        });

    };
    

    function reply(user_data){
        $.post("Post", user_data, function(data){

            if(data.status == 'fail'){
                displayError(data.message, $("#addReply_btn"));

            }else if(data.status == 'success'){
                displaySuccess(data.message);
                location.reload();
                $("#text_box").val("");

            }


        });
    }



    $(".memberEditBtn").on('click', function(e){
        var memberId = $(this).attr('id');

        user_data = {
            'action': 'getMemberDetails',
            'id': memberId
        }

        $.post('GetJson', user_data, function(data) {

            if(data.status == "success"){
                
                $(".black_window_container").show();
                $(".editMember_container").show();

                $("#memberId").val(memberId);
                $("#editEmail").val(data.email);
                $("#editUsername").val(data.username);
                $("#editfName").val(data.fname);
                $("#editlName").val(data.lname);

                setUpMemberRole(data.roleId);

            }else{
                alert("Doslo je do greske!");
            }


        });

    });



    $(".banBtn").on('click', function(e){
        var memberId = $(this).attr('memberId');
        var bannedStatus = $(this).attr('bannedStatus');

        if(bannedStatus == "true"){
            inString = "unban"
           var banned = "false"; 
        }else{
            inString = "ban"
            var banned = "true";
        }
        
        user_data = {
            'action': 'banMember',
            'id': memberId,
            'banned': banned
        }

        if(confirm("Zelite da obrisete  " + inString + " da li ste sigurni?")){
            $.post('Panel', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message)
                    window.setTimeout(function(e){
                        location.reload();
                    }, 3000);

                }else{
                    displayError(data.message, $(this));
                }


            });            

        }


        
    });


     $(".actBtn").on('click', function(e){
        var memberId = $(this).attr('memberId');
        var activeStatus = $(this).attr('activeStatus');

        if(activeStatus == "false"){
            inString = "activate"
            var actStatus = "true"; 
        }else{
            inString = "deactivate"
            var actStatus = "false";
        }
        
        user_data = {
            'action': 'actMember',
            'id': memberId,
            'active': actStatus
        }

        if(confirm("Zelite da obrisete  " + inString + " da li ste sigurni?")){
            $.post('Panel', user_data, function(data) {

               if(data.status == "success"){
                    displaySuccess(data.message)
                    window.setTimeout(function(e){
                        location.reload();
                    }, 3000);

                }else{
                    displayError(data.message, $(this));
                }

            });            

        }


        
    });


    $(".memberDelBtn").on('click', function(e){
        var memberId = $(this).attr('id');
        
        user_data = {
            'action': 'delMember',
            'id': memberId
        }

        if(confirm("Da li ste sigurni da zelite da obrisete ovog korisnika?")){
            $.post('Panel', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message);
                    window.setTimeout(function(e){
                        location.reload();
                    }, 3000);

                }else{
                    displayError(data.message, $(this));
                }


            });            

        }


        
    });



    $(".memberResetPassBtn").on('click', function(e){
        var memberId = $(this).attr('id');
        
        user_data = {
            'action': 'passResetMember',
            'id': memberId
        }

        if(confirm("Da li ste sigurni da zelite da izmenite lozinku korisnika?")){
            $.post('Panel', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message);

                }else{
                    displayError(data.message, $(this));
                }


            });            

        }


        
    });




    $(".forumEditBtn").on('click', function(e){
        var forumId = $(this).attr('forumId');


        user_data = {
            'action': 'getForumDetails',
            'id': forumId
        }

        $.post('GetJson', user_data, function(data) {

            if(data.status == "success"){
                
                $(".black_window_container").show();
                $(".editForum_container").show();

                $("#editName").val(data.ForumName);
                $("#editDescription").val(data.ForumDesc);

                $("#forumId").val(forumId);


            }else{
                alert("Doslo je do greske!");
            }


        });

    });



    $(".forumLockBtn").on('click', function(e){
        var forumId = $(this).attr('forumId');
        var locked = $(this).attr('locked');


        if(locked == "true"){
            user_data = {
                'action': 'unlock',
                'id': forumId
            }


            if(confirm("Da li ste sigurni da zelite da otkljucate ovaj forum?")){
                unlockForum(user_data);      
            }


        }else{
            user_data = {
                'action': 'lock',
                'id': forumId
            }


            if(confirm("Da li ste sigurni da zelite da zakljucate ovaj forum?")){
                lockForum(user_data);      
            }

        }

    });


    function lockForum(user_data){
        $.post('Forum', user_data, function(data) {

                if(data.status == "success"){
                    location.reload();
                }else{
                    displayError("Doslo je do greske!", $(this));
                }

            });      
    }


    function unlockForum(user_data){
        $.post('Forum', user_data, function(data) {

                if(data.status == "success"){
                    location.reload();
                }else{
                    displayError("Doslo je do greske!", $(this));
                }

            });      
    }






    $(".forumRemoveBtn").on('click', function(e){
        var forumId = $(this).attr('forumId');
        

        user_data = {
            'action': 'del',
            'id': forumId
        }

        if(confirm("Da li ste sigurni da zelite da obriste ovaj forum?")){
            $.post('Forum', user_data, function(data) {

                if(data.status == "success"){
                    alert("Forum uspesno obrisan!");
                    location.reload();
                }else{
                    alert("Doslo je do greske!");
                }

            });            
        }

        
    });




    $(".topicEditBtn").on('click', function(e){

        $(".black_window_container").show();
        $(".addTopic_container").show();

        topicId = $("#topicId").val();


        user_data = {
            'action': 'getTopicDetails',
            'id': topicId
        }

        // getting topic details
         $.post('GetJson', user_data, function(data) {

                if(data.status == "success"){
                    
                    $("#topicTitle").val(data.title);
                    $("#topicDesc").val(data.desc);
                    tinymce.get('topicText').setContent(data.content);

                }else{
                    displayError(data.message, $(this));
                }

        });

    });

    $(".topicLockBtn").on('click', function(e){
        var topicId = $(this).attr('topicId');
        var locked = $(this).attr('locked');


        if(locked == "true"){

            user_data = {
                'action': 'unlock',
                'id': topicId
            }

            topicUnLock(user_data);

        }else{
            
            user_data = {
                'action': 'lock',
                'id': topicId
            }

            topicLock(user_data);
        }

        
    });


    function topicLock(user_data){
        if(confirm("Da li ste sigurni da zelite da zakljucate ovu temu?")){
            $.post('Topic', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message);
                    location.reload();
                }else{
                    displayError(data.message, $("#topicLockBtn"));
                }

            });            
        }
    }

    function topicUnLock(user_data){
        if(confirm("Da li ste sigurni da zelite da otkljucate ovu temu?")){
            $.post('Topic', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message);
                    location.reload();
                }else{
                    displayError(data.message, $("#topicLockBtn"));
                }

            });            
        }
    }






    $(".topicRemoveBtn").on('click', function(e){
        var topicId = $(this).attr('topicId');
    
        user_data = {
            'action': 'del',
            'id': topicId
        }

        if(confirm("Da li ste sigurni da zelite da obrisete ovu temu?")){
            $.post('Topic', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message);
                    location.reload();
                }else{
                    displayError(data.message, $(this));
                }

            });            
        }

        
    });

    $(".topicBookmarkBtn").on('click', function(e){
        var topicId = $(this).attr('topicId');
        var bookmarked = $(this).attr('bookmarked');
    

        if(bookmarked == "true"){

             user_data = {
                'action': 'unbookmark',
                'id': topicId
            }   

            unbookmark(user_data);


        }else{

            user_data = {
                'action': 'bookmark',
                'id': topicId
            }            

            bookmark(user_data);

        }

    });


    function bookmark(user_data){

        $.post('Topic', user_data, function(data) {

            if(data.status == "success"){
                displaySuccess(data.message);
                location.reload();
            }else{
                displayError(data.message, $(".topicBookmarkBtn"));
            }

        });         
    }

    function unbookmark(user_data){

        $.post('Topic', user_data, function(data) {

            if(data.status == "success"){
                displaySuccess(data.message);
                location.reload();
            }else{
                displayError(data.message, $(".topicBookmarkBtn"));

            }

        });         
    }




    $(".replyEditBtn").on('click', function(e){
        replyId = $(this).attr('replyId');

        $(".black_window_container").show();
        $(".reply_windowEdit").show();


        user_data = {
            'action': 'getReplyDetails',
            'id': replyId
        }

        // getting reply details
         $.post('GetJson', user_data, function(data) {

                if(data.status == "success"){
                    tinymce.get('editTopicContent').setContent(data.content);
                    $("#replyId").val(replyId);

                }else{
                    alert("Doslo je do greske!");
                }

        });

    });



   $(".replyRemoveBtn").on('click', function(e){
        replyId = $(this).attr('replyId');


        user_data = {
            'action': 'del',
            'id': replyId
        }


        if(confirm("Da li ste sigurni da zelite da obrisete ovaj odgovr?")){

            $.post('Post', user_data, function(data) {

                    if(data.status == "success"){
                        displaySuccess(data.message);
                        location.reload();

                    }else{
                        displayError(data.message, $(this));
                    }

            });    
        }


    });


    $("#editReply_btn").on('click', function(e){
        e.preventDefault();

        var id = $("#replyId").val();
        var content = tinymce.get('editTopicContent').getContent();

        user_data = {
            'action': 'edit',
            'id': id,
            'content': content
        }


        if(content == ""){
            displayError("Sadrzaj ne sme biti prazan!", $(this));
            return;

        }else if(content.length < 15){
            displayError("Sadrzaj mora da sadrzi bar 15 karaktera!", $(this));
            return;

        }

        // getting reply details
         $.post('Post', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message);
                    $(".reply_windowEdit").hide();
                    $(".black_window_container").hide();
                    location.reload();

                }else{
                    displayError(data.message, $(this));
                }

        });

    });


    $("#srch").on('click', function(e){
        var term =  $("#srch-term").val();

        if(term == ""){
            e.preventDefault();

            // prikaz detaljne pretrage
            $(".black_window_container").show();
            $(".advancedSearch_container").show();


        }

    });


    $("#searchBtn").on('click', function(e){
        var term =  $("#keyword").val();
        var cbox = $("#dateCB");

        if(term == "" && !cbox.is(':checked')){
            e.preventDefault();

            displayError("Unesite kljucnu rec ili izaberite datum!", $(this));

        }

    });



    $("#change_settings").on('click', function(e){
        e.preventDefault();
        
        var host = $("#host").val();
        var port = $("#port").val();
        var uname = $("#mailUsername").val();
        var pass = $("#mailPassword").val();

        var user_data = {
            'action': 'editMailSet',
            'host': host,
            'port': port,
            'username': uname,
            'password': pass
        }

        // chaning mail settings
         $.post('Panel', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message);

                }else{
                    displayError(data.message, $(this));

                }

        });


    });



    $("#test_settings").on('click', function(e){
        e.preventDefault();
        
        var host = $("#host").val();
        var port = $("#port").val();
        var uname = $("#mailUsername").val();
        var pass = $("#mailPassword").val();

        var to = prompt("Enter your email");

        var user_data = {
            'action': 'testMailSet',
            'host': host,
            'port': port,
            'username': uname,
            'password': pass,
            'to':to
        }

        // testing mail settings
        $.post('Panel', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message);

                }else{
                    displayError(data.message, $(this));

                }

        });


    });


   $("#change_conf_settings").on('click', function(e){
        e.preventDefault();
        
        var subject = $("#subject").val();
        var message = tinymce.get('message').getContent();

        var user_data = {
            'action': 'editConfMessage',
            'subject': subject,
            'content': message
        }

        // changing confirm message
        $.post('Panel', user_data, function(data) {

                if(data.status == "success"){
                    displaySuccess(data.message);

                }else{
                    displayError(data.message, $(this));

                }

        });


    });


   function displayError(message, button2disable){
        button2disable.prop("disabled", true);
        $(".messageErr").hide();
        $(".notification").dequeue();


        $(".message").text(message);
        $(".messageErr").show();
        $(".notification").show("slow").delay(3000).fadeOut(function(e){
            $(".messageErr").hide();

            button2disable.prop("disabled", false);

        });



   }


    function displaySuccess(message){
       $(".messageOk").hide();
        $(".notification").dequeue();


        $(".message").text(message);
        $(".messageOk").show();
        $(".notification").show("slow").delay(3000).fadeOut(function(e){
            $(".messageOk").hide();

        });


   }


   $("#pass-reset-btn").on('click', function(e){
        e.preventDefault();

        var username = $("#usernameLog").val();

        if(username == ""){
            displayError("Unesite korisnicko ime prvo!", $(this));
            return;
        }

       var user_data = {
            'action':'reset',
            'username': username
            
       }

       $.post('PasswordReset', user_data, function(data) {

            if(data.status){
                displaySuccess(data.message);

            }else{
                displayError(data.message, $(this));

            }

       });


   });


   $("#reset_pass").on('click', function(event) {
       event.preventDefault();

       var id = $("#userId").val();
       var pass1 = $("#pwd").val();
       var pass2 = $("#pwd2").val();

       if(pass1 == "" || pass2 == ""){
            displayError("Polja ne smeju biti prazna!", $(this));
            return;

       }else if(pass1 != pass2){
            displayError("Lozinka se ne slaze sa nasom u bazi!", $(this));
            return;

       }else if(pass1.length < 10){
            displayError("Lozinka mora da sadzi bar 10 karaktera!", $(this));
            return;        
       }


       var user_data = {
            'id':id,
            'password1': pass1,
            'password2': pass2
       }

       $.post('PasswordReset', user_data, function(data) {

            if(data.status){
                displaySuccess(data.message);
                window.setTimeout(redirect, 3000);

        
            }else{
                displayError(data.message, $(this));

            }

       });


   });


    function redirect(){
        window.location.href = "./";    
    }   


    $("#usernameReg").on('blur', function(event) {
        var username = $("#usernameReg").val();

        var user_data = {
            'action': 'checkUsername',
            'username': username
        }


        $.post('GetJson', user_data, function(data) {

            if(data.status != "success"){
                $("#usernameReg").css('border', '1px solid red');
                displayError(data.message, $(this));
            
            }else{
                $("#usernameReg").css('border', '');
            }


       });

    });


    $("#email").on('blur', function(event) {
        var email = $("#email").val();

        var user_data = {
            'action': 'checkEmail',
            'email': email
        }


        $.post('GetJson', user_data, function(data) {

            if(data.status != "success"){
                $("#email").css('border', '1px solid red');
                displayError(data.message, $(this));
            
            }else{
                $("#email").css('border', '');
            }


       });

    });


    $(".canClick").on('click', function(e){

        var id = $(this).attr('ajdi');

        window.location.href = "./Forum?id=" + id;


    });

    $(".canClick2").on('click', function(e){

        var id = $(this).attr('ajdi');

        window.location.href = "./Topic?id=" + id;
        

    });



});


function setUpNumPerPage(number){
    $("#numberPerPage").val(number.toString());
}


function setUpMemberRole(role){
    $("#memberRole").val(role.toString());
}



// pagination for posts in topic
$(document).ready(function() {
    
    var pageParts = $(".reply");
    var numPages = pageParts.length;
    var perPage = $("#postsPerPage").val();

    pageParts.slice(perPage).hide();
    $(".page-nav").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
        onPageClick: function(pageNum) {
            var start = perPage * (pageNum - 1);
            var end = start + perPage;
            pageParts.hide()
                     .slice(start, end).show();
        }
    });

});



// pagination for public forums
$(document).ready(function() {
    
    var pageParts = $(".postsPublic");

    var numPages = pageParts.length;
    var perPage = $("#postsPerPage").val();
    pageParts.slice(perPage).hide();
    $(".nav-public").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
        onPageClick: function(pageNum) {
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

            pageParts.hide()
                     .slice(start, end).show();
        }
    });

});


// pagination for opened forums
$(document).ready(function() {
    
    // Grab whatever we need to paginate
    var pageParts = $(".postsOpened");

    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = $("#postsPerPage").val();

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $(".nav-opened").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
        // We implement the actual pagination
        //   in this next function. It runs on
        //   the event that a user changes page
        onPageClick: function(pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

            // First hide all page parts
            // Then show those just for our page
            pageParts.hide()
                     .slice(start, end).show();
        }
    });

});


// pagination for closed forums
$(document).ready(function() {
    
    // Grab whatever we need to paginate
    var pageParts = $(".postsClosed");

    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = $("#postsPerPage").val();

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $(".nav-closed").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
        // We implement the actual pagination
        //   in this next function. It runs on
        //   the event that a user changes page
        onPageClick: function(pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

            // First hide all page parts
            // Then show those just for our page
            pageParts.hide()
                     .slice(start, end).show();
        }
    });

});


// pagination for subforums
$(document).ready(function() {
    
    // Grab whatever we need to paginate
    var pageParts = $(".subforums");

    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = $("#postsPerPage").val();

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $(".nav-subForum").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
        // We implement the actual pagination
        //   in this next function. It runs on
        //   the event that a user changes page
        onPageClick: function(pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

            // First hide all page parts
            // Then show those just for our page
            pageParts.hide()
                     .slice(start, end).show();
        }
    });

});


// pagination for topics
$(document).ready(function() {
    
    // Grab whatever we need to paginate
    var pageParts = $(".topicc");

    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = $("#postsPerPage").val();

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $(".nav-topic").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
        // We implement the actual pagination
        //   in this next function. It runs on
        //   the event that a user changes page
        onPageClick: function(pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

            // First hide all page parts
            // Then show those just for our page
            pageParts.hide()
                     .slice(start, end).show();
        }
    });

});


// pagination for search forums
$(document).ready(function() {
    
    // Grab whatever we need to paginate
    var pageParts = $(".searchForums");

    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = 5;

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $(".srchForum").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
        // We implement the actual pagination
        //   in this next function. It runs on
        //   the event that a user changes page
        onPageClick: function(pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

            // First hide all page parts
            // Then show those just for our page
            pageParts.hide()
                     .slice(start, end).show();
        }
    });

});
