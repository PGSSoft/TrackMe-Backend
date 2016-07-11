using System;
using System.Collections.Concurrent;
using System.Linq;
using TrackMeBL.Infrastructure;
using TrackMeBL.Model;
using TrackMeBL.Services;

namespace TrackMeBL.Utils
{
    public sealed class InMemoryNavigationManager : INavigationManager
    {
        #region Members

        private readonly ConcurrentDictionary<string, NavigationItem> _items;
        private readonly ConcurrentDictionary<string, NavigationItem> _expireditems;
        private readonly ConcurrentDictionary<string, string> _privateTokenMap;
        private readonly ITokenGenerator _tokenGenerator;

        #endregion

        #region Ctor

        public InMemoryNavigationManager(ITokenGenerator tokenGenerator)
        {
            _items = new ConcurrentDictionary<string, NavigationItem>();
            _expireditems = new ConcurrentDictionary<string, NavigationItem>();
            _privateTokenMap = new ConcurrentDictionary<string, string>();
            _tokenGenerator = tokenGenerator;
        }

        #endregion

        #region Public Methods

        public NavigationItem GetItem(string token)
        {
            if (String.IsNullOrEmpty(token))
            {
                return null;
            }
            CleanIfExpired(token);
            NavigationItem item;
            if (_items.TryGetValue(token, out item))
            {
                return item;
            }
            return _expireditems.TryGetValue(token, out item) ? item : null;
        }

        public NavigationItem this[string token] => GetItem(token);

        public TokensModel CreateItem(double latitude, double longitude, int duration, string address, double? accuracy)
        {
            var token = _tokenGenerator.GenerateToken();
            var privateToken = _tokenGenerator.GenerateToken();
            var item = new NavigationItem
            {
                Latitude = latitude,
                Longitude = longitude,
                StartTime = DateTime.Now,
                Expired = null,
                Address = address ?? "",
                Accuracy = accuracy
            };
            item.ExpirationTime = item.StartTime.AddMinutes(duration);
            _items.AddOrUpdate(token, s => item, (s, ni) => item);
            _privateTokenMap.AddOrUpdate(privateToken, t => token, (t, i) => token);
            return new TokensModel { PublicToken = token, PrivateToken = privateToken };
        }

        public OperationResult<string> DeactivateItem(string pirvateToken)
        {
            string publicToken;
            if (!_privateTokenMap.TryGetValue(pirvateToken, out publicToken))
            {
                return OperationResult<string>.Failure("Token invalid");
            }
            var expireResult = ExpireItem(publicToken);
            if (expireResult.IsError)
            {
                return OperationResult<string>.Failure(expireResult.ErrorMessage);
            }
            var dumper = new SessionDumper();
            dumper.LogSession(publicToken, expireResult.Result);
            return OperationResult<string>.Success(publicToken);
        }

        #endregion

        #region Private Methods

        private void CleanIfExpired(string publicToken)
        {
            NavigationItem item;
            if (!_items.TryGetValue(publicToken, out item))
            {
                return;
            }
            if (item.ExpirationTime <= DateTime.Now)
            {
                ExpireItem(publicToken);
            }
        }

        private OperationResult<NavigationItem> ExpireItem(string publicToken)
        {
            NavigationItem item;
            if (!_items.TryRemove(publicToken, out item))
            {
                return OperationResult<NavigationItem>.Failure("Session already disabled");
            }
            item.Expired = DateTime.Now;
            _expireditems.AddOrUpdate(publicToken, t => item, (t, i) => item);
            TryRemoveFromMap(publicToken);
            return OperationResult<NavigationItem>.Success(item);
        }

        private bool TryRemoveFromMap(string publicToken)
        {
            var entry = _privateTokenMap.SingleOrDefault(x => x.Value == publicToken);
            if (entry.Key == null)
            {
                return false;
            }
            string token;
            return _privateTokenMap.TryRemove(entry.Key, out token);
        }

        #endregion
    }
}