import React, { useEffect, useState } from 'react'
import { profilesAPI } from '../../api/profiles'

export const useProfile = (id) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [profile, setProfile] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await profilesAPI.findByUserId(id) // { ...profile }

				setProfile(res)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	return { profile, loading, error }
}
