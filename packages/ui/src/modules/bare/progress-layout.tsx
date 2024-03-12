import {motion} from 'framer-motion'

import {UmbrelHeadTitle} from '@/components/umbrel-head-title'
import {Alert} from '@/modules/bare/alert'
import {Progress} from '@/modules/bare/progress'
import {bareContainerClass, BareLogoTitle, BareSpacer} from '@/modules/bare/shared'
import {t} from '@/utils/i18n'

export function ProgressLayout({
	title,
	// onSuccess,
	// onFail,
	progress,
	message,
	// isStarting,
	isRunning,
}: {
	title: string
	// onSuccess: () => void
	// onFail: () => void
	progress?: number
	message: string
	// isStarting: boolean
	isRunning: boolean
}) {
	const isStarting = !progress && !isRunning

	return (
		<>
			<UmbrelHeadTitle>{message}</UmbrelHeadTitle>
			<motion.div
				className={bareContainerClass}
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 0.4, delay: 0.2}}
			>
				<BareLogoTitle>{title}</BareLogoTitle>
				<BareSpacer />
				{/* Show indeterminate value if not running */}
				<Progress value={isStarting ? undefined : progress}>{message}</Progress>
				<div className='flex-1 pt-4' />
				<Alert>{t('migrate.callout')}</Alert>
			</motion.div>
		</>
	)
}