import Icon from '@/lib/components/common/Icon';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/lib/components/ui/alert-dialog';
import { JSXChildren } from '@/lib/types/common';

type ConfirmDialogProps = {
    variant?: 'confirm' | 'danger';
    children: JSXChildren;
    triggerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    title: string;
    description: string;
    cancel?: JSXChildren;
    confirm?: JSXChildren;
    onConfirm?: Function;
};

export const ConfirmDialog = ({
    variant = 'confirm',
    children,
    triggerProps,
    title,
    description,
    cancel,
    confirm,
    onConfirm = () => {},
}: ConfirmDialogProps) => {
    let actionProps: any = { onClick: onConfirm, className: 'button' };
    if (variant === 'confirm') {
        actionProps.style = { backgroundColor: '#3a78ff' };
    }
    if (variant === 'danger') {
        actionProps.className += ' bg-destructive hover:bg-destructive';
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger {...(triggerProps || {})}>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={variant === 'danger' ? 'text-destructive' : ''}>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancel || 'Cancel'}</AlertDialogCancel>
                    <AlertDialogAction {...actionProps}>{confirm || 'Continue'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
