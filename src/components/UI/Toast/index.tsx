import { ToastProps } from '@chakra-ui/react';

interface Props {
  toastFunc: any;
  toastProps: ToastProps;
}

const useCustomToast = (props: Props) => {
  const toastProps = props.toastProps;
  const toast = props.toastFunc;
  const toastId = toastProps.id;
  const showCustomToast = (): any => {
    if (toastId && !toast.isActive(toastId)) {
      return toast({
        id: toastId,
        title: toastProps.title,
        description: toastProps.description,
        status: toastProps.status,
        duration: toastProps.duration ?? 5000,
        isClosable: toastProps.isClosable ?? true,
      });
    }
  };
  return { showCustomToast };
};

export default useCustomToast;
