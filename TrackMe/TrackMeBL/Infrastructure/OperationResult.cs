namespace TrackMeBL.Infrastructure
{
    public class OperationResult<T>
    {
        private OperationResult() {}

        public bool IsError { get; private set; }
        public string ErrorMessage { get; private set; }

        public T Result { get; private set; }

        public static OperationResult<T> Success(T result)
        {
            return new OperationResult<T>
            {
                IsError = false,
                Result = result
            };
        }

        public static OperationResult<T> Failure(string message)
        {
            return new OperationResult<T>
            {
                IsError = true,
                ErrorMessage = message
            };
        }
    }

    public class OperationResult
    {
        private OperationResult() { }

        public bool IsError { get; private set; }
        public string ErrorMessage { get; private set; }

        public static OperationResult Success()
        {
            return new OperationResult
            {
                IsError = false
            };
        }

        public static OperationResult Failure(string message)
        {
            return new OperationResult
            {
                IsError = true,
                ErrorMessage = message
            };
        }
    }
}
