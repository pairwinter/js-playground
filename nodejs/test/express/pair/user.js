var User={
		users:[{name:"tear1"},{name:"tear1"},{name:"tear1"}],
		get:function(id,cb){
			var user=this.users[id];
			if(!user)
			{
				cb(new Error("找不到用户"),null);
			}else{
				cb(null,user);
			}
		}
	};
exports.User=User;