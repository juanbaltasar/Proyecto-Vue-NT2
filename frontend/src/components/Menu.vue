<template>
	<div>
		<div class="navbar-item">
			<div class="field is-grouped">
				<p class="control">
					<a v-if="!isUserLoggedIn" class="button is-info is-rounded" @click="showSignupModal">
						<span class="icon">
							<i class="fa fa-user-plus"></i>
						</span>
						<span>{{ signupLabel }}</span>
					</a>
				</p>
				<p class="control">
					<a v-if="!isUserLoggedIn" class="button is-success is-rounded" @click="showLoginModal">
						<span class="icon">
							<i class="fa fa-user"></i>
						</span>
						<span>{{ loginLabel }}</span>
					</a>
				</p>
			</div>
		</div>
		<div v-if="isUserLoggedIn" class="navbar-item is-hoverable">
			<span>
				Bienvenido {{ getUserName }}
			</span>
			<a class="navbar-item" @click="logout">
				{{ logoutLabel }}
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Menu',
	data () {
		return {
			logoutLabel: 'Salir',
			loginLabel: 'Ingresar',
			signupLabel: 'Registro'
		}
	},

	computed: {
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn;
		},
		getUserName () {
			let name = this.$store.getters.getUserName;
			
			if (name === '') {
				return 'Usuario';
			} else {
				return name;
			}
		}
	},

	methods: {
		logout () {
			this.$store.commit('isUserLoggedIn', false);
			this.$store.commit('isUserSignedUp', false);

			this.$router.push({ name: 'index' });
		},
		showLoginModal () {
			this.$store.commit('showLoginModal', true);
		},
		showSignupModal () {
			this.$store.commit('showSignupModal', true);
		}
	}
}
</script>

<style lang="css" scoped>
  * {

    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  }

</style>
