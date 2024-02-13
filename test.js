const parent = document.getElementById('something');

const items = [
	{
		album: 'appetite for destruction',
		artist: 'Guns N Roses',
		year: 1987,
		copiesSold: 1000000,
	},
	{
		album: 'Thriller',
		artist: 'Michael Jackson',
		year: 1982,
		copiesSold: '1,000,000',
	},
];

items.forEach((item) => {
	const div = document.createElement('div');
	div.classList.add('card');
	div.innerText = `name: ${item.album}
	author: ${item.artist}
	year: ${item.year}
	Sold ${item.copiesSold} Copies
	`;

	parent.appendChild(div);
});

class User {
	constructor(params) {
		this.name = params.name || '';
		this.email = params.email || '';
		this.password = params.password || '';
	}
	resetPassword() {
		console.log('reset password function');
		console.log(this.password);
	}
	getName() {
		return this.name || '';
	}
}

// const andrew = new User({
// 	name: 'andrew',
// 	email: 'test@gmail.com',
// });
const user = new User({
	name: 'andrew',
});
const user2 = new User({
	name: 'sarah',
});
const name = user2.resetPassword();

console.log(name);
// console.log([user, user2]);
