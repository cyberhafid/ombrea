import factory
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.database import Base, get_db
from src.main import app
from src.models import Farmer, Site

TEST_DB_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client(db):
    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


class FarmerFactory(factory.alchemy.SQLAlchemyModelFactory):
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")

    class Meta:
        model = Farmer
        sqlalchemy_session_persistence = "commit"


class SiteFactory(factory.alchemy.SQLAlchemyModelFactory):
    name = factory.Faker("city")
    farmer = factory.SubFactory(FarmerFactory)

    class Meta:
        model = Site
        sqlalchemy_session_persistence = "commit"


@pytest.fixture
def site_factory(db):
    FarmerFactory._meta.sqlalchemy_session = db
    SiteFactory._meta.sqlalchemy_session = db
    return SiteFactory
