import cn from 'classnames';
import s from './text.module.scss';

export const Text = ({
  color,
  size = 'normal' | 'medium' | 'price' | 'discount_price',
  weight = 'medium' | 'semi' | 'bold',
  span,
  className,
  children,
  }) => {
    if (span) {
      return (
          <span
              className={cn(
                  s.span,
                  size && s[`size_${size}`],
                  color && s[`color_${color}`],
                  weight && s[`weight_${weight}`],
                  className,
              )}
          >
        {children}
      </span>
      )
    }

    return (
        <p
            className={cn(
                s.text,
								size && s[`size_${size}`],
								color && s[`color_${color}`],
								weight && s[`weight_${weight}`],
                className,
            )}
        >
          {children}
        </p>
    )
};
