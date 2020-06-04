const config = require('config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('../db/db');
const admin = db.models.admin;
const appUser = db.models.appusers;
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtToken;
module.exports = passport => {
	passport.use('appUser', new JWTStrategy(opts, async (jwt_payload, done) => {
	try {
	const getuser = await appUser.findOne(
				{
					where: {
						id: jwt_payload.id,
						email: jwt_payload.email
					}
				});

			if (getuser) {
				return done(null, getuser.dataValues);
			}
			return done(null, false);
		} catch (e) {
			console.log('not local');
			console.error(e);
		}
	}));


	passport.use('admin', new JWTStrategy(opts, async (jwt_payload, done) => {
		try {
		
			const getuser = await admin.findOne(
				{
					where: {
						id: jwt_payload.id,
						email: jwt_payload.email
					}
				});

			if (getuser) {
				return done(null, getuser.dataValues);
			}
			return done(null, false);
		} catch (e) {
			console.log('admin passport');
			console.error(e);
		}
	}));

}

