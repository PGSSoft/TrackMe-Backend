namespace TrackMeBL.Utils
{
    /// <summary>
    /// IToken Generator serves for tokens for NavigationItems.
    /// </summary>
    public interface ITokenGenerator
    {
        /// <summary>
        /// Generates the token.
        /// </summary>
        /// <returns></returns>
        string GenerateToken();
    }
}