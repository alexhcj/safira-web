import { useEffect, useState } from 'react'
import { productsAPI } from '../../../api'
import { convertArray } from '../../../utils'
import s from './mostless.module.css'

export const MostLess = () => {
	const [mostLess, setMostLess] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const params = ['name', 'price', 'newprice', 'quantity', 'popularity', 'date', 'views', 'rating', 'shelfLife']

	useEffect(() => {
		const mostLessQueries = params.reduce((acc, sortValue) => {
			acc.push(
				{
					params: {
						sort: sortValue,
						limit: 1,
						order: 'desc',
					},
				},
				{
					params: {
						sort: sortValue,
						limit: 1,
						order: 'asc',
					},
				}
			)
			return acc
		}, [])

		const fetchData = async () => {
			setIsLoading(true)

			try {
				const promises = Promise.all(
					mostLessQueries.map((req) => {
						const { sort, limit, order } = req.params

						// newprice_gte param breaks default method
						if (sort === 'newprice') {
							return productsAPI.getProductsByNewprice({ sort, limit, order }).then((res) => res.data)
						}

						return productsAPI.getProducts({ sort, limit, order }).then((res) => res.data)
					})
				)

				let res = await Promise.all([promises])
				setMostLess(convertArray(res[0], 2))
			} catch (e) {
				console.log(e)
			}

			setIsLoading(false)
		}

		fetchData()

		// params data are changed by hands
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				mostLess.map((data, index) => {
					const paramsKey = params[index]

					return (
						<div className={s.table} key={index}>
							<h6 className={s.h6}>{params[index]}</h6>
							{data.map((item, index) => {
								const paramsValue = item[0][paramsKey]
								const { id, name, img } = item[0]

								return (
									<div className={s.col} key={id}>
										<div className={s.card}>
											<img className={s.img} src={img} alt='' />
											<div>
												<div className={s.name}>{name}</div>
												<div className={index === 0 ? `${s.paramMost}` : `${s.paramLess}`}>
													{paramsValue}
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					)
				})
			)}
		</>
	)
}
