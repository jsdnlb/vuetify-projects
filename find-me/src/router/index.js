import Vue from "vue";
import VueRouter from "vue-router";
import {auth} from "@/firebase";

Vue.use(VueRouter);

const routes = [
	{
		path: "/home",
		name: "Home",
		component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
		meta: {requiresAuth: true}
	},
	{
		path: "/",
		name: "Inicio",
		component: () => import(/* webpackChunkName: "about" */ "../views/Index.vue")
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
		meta: {requiresAuth: true}
	},
	{
		path: "/adopt",
		name: "Adopt",
		component: () => import(/* webpackChunkName: "about" */ "../views/Adopt.vue"),
		meta: {requiresAuth: true}
	},
	{
		path: "/login",
		name: "Ingreso",
		component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue")
	},
	{
		path: "/post/:id",
		name: "Post",
		component: () => import(/* webpackChunkName: "about" */ "../views/Post.vue")
	},
	{
		path: "/postGlobal",
		name: "PostGlobal",
		component: () => import(/* webpackChunkName: "about" */ "../views/PostGlobal.vue")
	},
	{
		path: "/users",
		name: "Users",
		component: () => import(/* webpackChunkName: "about" */ "../views/Users.vue")
	},
	{
		path: "/losts",
		name: "Losts",
		component: () => import(/* webpackChunkName: "about" */ "../views/Losts.vue")
	},
	{
		path: "/reportLostPet",
		name: "ReportLostPet",
		component: () => import(/* webpackChunkName: "about" */ "../views/ReportLostPet.vue")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	const user = auth.currentUser;

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (user) {
			next();
		} else {
			next({
				name: "Ingreso"
			});
		}
	} else {
		next(); // make sure to always call next()!
	}
});

export default router;
