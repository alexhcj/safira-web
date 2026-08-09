import { useEffect, useState } from 'react'

import { profilesAPI } from '@api/profiles'

export const useProfile = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [profile, setProfile] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await profilesAPI.findProfile()

				setProfile(res)
			} catch (err) {
				setError(err)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	return { profile, isLoading, error }
}
