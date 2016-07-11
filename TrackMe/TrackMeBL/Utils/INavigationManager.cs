using TrackMeBL.Infrastructure;
using TrackMeBL.Model;

namespace TrackMeBL.Utils
{
    /// <summary>
    /// Naviagtion manager is responsible for managing NavigationItems
    /// </summary>
    public interface INavigationManager
    {
        /// <summary>
        /// Given token returns the <see cref="NavigationItem"/>.
        /// </summary>
        /// <param name="token">The token.</param>
        /// <returns>NavigationItem</returns>
        NavigationItem GetItem(string token);

        /// <summary>
        /// Gets the <see cref="NavigationItem"/> with the specified token.
        /// </summary>
        /// <value>
        /// The <see cref="NavigationItem"/>.
        /// </value>
        /// <param name="token">The token.</param>
        /// <returns>NavigationItem</returns>
        NavigationItem this[string token] { get; }

        /// <summary>
        /// Initiates a new NavigationItem.
        /// </summary>
        /// <param name="latitude">The latitude.</param>
        /// <param name="longitude">The longitude.</param>
        /// <param name="duration">The duration.</param>
        /// <param name="address">The address.</param>
        /// <returns>Token</returns>
        TokensModel CreateItem(double latitude, double longitude, int duration, string address, double? accuracy);

        OperationResult<string> DeactivateItem(string token);
    }
}